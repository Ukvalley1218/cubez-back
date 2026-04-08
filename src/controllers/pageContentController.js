import Page from '../models/Page.js';
import Section from '../models/Section.js';
import Field from '../models/Field.js';
import ContentSection from '../models/ContentSection.js';
import SiteSettings from '../models/SiteSettings.js';
import Navigation from '../models/Navigation.js';
import FormConfig from '../models/FormConfig.js';
import Metric from '../models/Metric.js';

/**
 * Get all content for a specific page by slug
 * This endpoint returns all page content in a single API call
 * Includes: page info, sections with fields, global settings, navigation
 */
export const getPageContent = async (req, res) => {
  try {
    const { slug } = req.params;
    const { includeInactive = 'false' } = req.query;

    // Get page by slug
    const page = await Page.findOne({
      slug,
      ...(includeInactive === 'false' ? { isActive: true } : {})
    });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    // Get sections for this page
    const sections = await Section.find({
      page: page._id,
      ...(includeInactive === 'false' ? { isActive: true } : {})
    }).sort({ order: 1 });

    // Get field values for each section
    const sectionIds = sections.map(s => s._id);
    const fields = await Field.find({ section: { $in: sectionIds } });

    // Group fields by section
    const fieldsBySection = {};
    fields.forEach(field => {
      const sectionId = field.section.toString();
      if (!fieldsBySection[sectionId]) {
        fieldsBySection[sectionId] = [];
      }
      fieldsBySection[sectionId].push(field);
    });

    // Combine sections with their field values
    const sectionsWithFields = sections.map(section => ({
      ...section.toObject(),
      fieldValues: fieldsBySection[section._id.toString()] || []
    }));

    // Get content sections (key-based content) for this page
    const contentSections = await ContentSection.find({
      page: slug,
      ...(includeInactive === 'false' ? { isActive: true } : {})
    }).sort({ order: 1 });

    // Group content sections by section name
    const contentBySection = {};
    contentSections.forEach(content => {
      if (!contentBySection[content.section]) {
        contentBySection[content.section] = [];
      }
      contentBySection[content.section].push(content);
    });

    res.json({
      success: true,
      data: {
        page: {
          id: page._id,
          name: page.name,
          slug: page.slug,
          title: page.title,
          description: page.description,
          heroSection: page.heroSection,
          seoTitle: page.seoTitle,
          seoDescription: page.seoDescription,
          seoKeywords: page.seoKeywords,
          ogImage: page.ogImage
        },
        sections: sectionsWithFields,
        contentSections: contentBySection
      }
    });
  } catch (error) {
    console.error('Error fetching page content:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching page content',
      error: error.message
    });
  }
};

/**
 * Get global settings (public settings only)
 */
export const getGlobalSettings = async (req, res) => {
  try {
    const { group } = req.query;

    const query = { isPublic: true };
    if (group) query.group = group;

    const settings = await SiteSettings.find(query).sort({ group: 1, order: 1 });

    // Convert to key-value object
    const settingsObj = {};
    settings.forEach(setting => {
      settingsObj[setting.key] = setting.value;
    });

    res.json({
      success: true,
      data: settingsObj
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get navigation (navbar and footer)
 */
export const getNavigation = async (req, res) => {
  try {
    const navbar = await Navigation.findOne({ location: 'navbar', isActive: true });
    const footer = await Navigation.findOne({ location: 'footer', isActive: true });

    res.json({
      success: true,
      data: {
        navbar: navbar?.items || [],
        footer: footer?.items || []
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get all public data for the website
 * This is a comprehensive endpoint that returns everything needed for the frontend
 */
export const getSiteData = async (req, res) => {
  try {
    const { pages } = req.query;

    // Get all active pages
    const pagesQuery = { isActive: true };
    if (pages) {
      pagesQuery.slug = { $in: pages.split(',') };
    }

    const activePages = await Page.find(pagesQuery).sort({ order: 1 });

    // Get all content sections
    const allContent = await ContentSection.find({ isActive: true }).sort({ page: 1, order: 1 });

    // Group by page
    const contentByPage = {};
    allContent.forEach(content => {
      if (!contentByPage[content.page]) {
        contentByPage[content.page] = {};
      }
      if (!contentByPage[content.page][content.section]) {
        contentByPage[content.page][content.section] = [];
      }
      contentByPage[content.page][content.section].push(content);
    });

    // Get navigation
    const navbar = await Navigation.findOne({ location: 'navbar' });
    const footer = await Navigation.findOne({ location: 'footer' });

    // Get public settings
    const publicSettings = await SiteSettings.find({ isPublic: true });
    const settings = {};
    publicSettings.forEach(setting => {
      settings[setting.key] = setting.value;
    });

    // Get metrics
    const metrics = await Metric.find({}).sort({ key: 1 });

    res.json({
      success: true,
      data: {
        pages: activePages.map(p => ({
          slug: p.slug,
          name: p.name,
          title: p.title,
          heroSection: p.heroSection,
          seoTitle: p.seoTitle,
          seoDescription: p.seoDescription
        })),
        content: contentByPage,
        navigation: {
          navbar: navbar?.items || [],
          footer: footer?.items || []
        },
        settings,
        metrics: metrics.reduce((acc, m) => {
          acc[m.key] = { value: m.value, suffix: m.suffix, label: m.label };
          return acc;
        }, {})
      }
    });
  } catch (error) {
    console.error('Error fetching site data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching site data',
      error: error.message
    });
  }
};

/**
 * Get form configuration by key (for frontend)
 */
export const getFormForFrontend = async (req, res) => {
  try {
    const { key } = req.params;

    const form = await FormConfig.findOne({
      formKey: key,
      isActive: true
    }).select('name fields submitButtonText successMessage');

    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found'
      });
    }

    res.json({
      success: true,
      data: form
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export default {
  getPageContent,
  getGlobalSettings,
  getNavigation,
  getSiteData,
  getFormForFrontend
};