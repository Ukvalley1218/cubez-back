import Navigation from '../models/Navigation.js';

// Get public navigation (navbar + footer)
export const getPublicNavigation = async (req, res) => {
  try {
    const [navbar, footer] = await Promise.all([
      Navigation.findOne({ location: 'navbar' }),
      Navigation.findOne({ location: 'footer' })
    ]);

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
      message: 'Error fetching navigation',
      error: error.message
    });
  }
};

// Get navbar
export const getNavbar = async (req, res) => {
  try {
    const navbar = await Navigation.findOne({ location: 'navbar' });
    res.json({
      success: true,
      data: navbar?.items || []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching navbar',
      error: error.message
    });
  }
};

// Get footer
export const getFooter = async (req, res) => {
  try {
    const footer = await Navigation.findOne({ location: 'footer' });
    res.json({
      success: true,
      data: footer?.items || []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching footer',
      error: error.message
    });
  }
};

// Admin: Get all navigation
export const getAdminNavigation = async (req, res) => {
  try {
    const navigation = await Navigation.find({}).sort({ location: 1 });
    res.json({
      success: true,
      data: navigation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching navigation',
      error: error.message
    });
  }
};

// Admin: Update navbar
export const updateNavbar = async (req, res) => {
  try {
    const { items } = req.body;

    let navbar = await Navigation.findOne({ location: 'navbar' });

    if (!navbar) {
      navbar = new Navigation({ location: 'navbar', items });
    } else {
      navbar.items = items;
      navbar.updatedAt = Date.now();
    }

    await navbar.save();

    res.json({
      success: true,
      message: 'Navbar updated successfully',
      data: navbar
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating navbar',
      error: error.message
    });
  }
};

// Admin: Update footer
export const updateFooter = async (req, res) => {
  try {
    const { items } = req.body;

    let footer = await Navigation.findOne({ location: 'footer' });

    if (!footer) {
      footer = new Navigation({ location: 'footer', items });
    } else {
      footer.items = items;
      footer.updatedAt = Date.now();
    }

    await footer.save();

    res.json({
      success: true,
      message: 'Footer updated successfully',
      data: footer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating footer',
      error: error.message
    });
  }
};

// Admin: Add nav item
export const addNavItem = async (req, res) => {
  try {
    const { location } = req.params;
    const { name, href, order, isDropdown, dropdownItems } = req.body;

    const nav = await Navigation.findOne({ location });

    if (!nav) {
      return res.status(404).json({
        success: false,
        message: 'Navigation not found'
      });
    }

    const newItem = { name, href, order: order || nav.items.length, isDropdown, dropdownItems };
    nav.items.push(newItem);
    await nav.save();

    res.json({
      success: true,
      message: 'Nav item added successfully',
      data: nav
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding nav item',
      error: error.message
    });
  }
};

// Admin: Update nav item
export const updateNavItem = async (req, res) => {
  try {
    const { location, itemId } = req.params;
    const { name, href, order, isDropdown, dropdownItems, isActive } = req.body;

    const nav = await Navigation.findOne({ location });

    if (!nav) {
      return res.status(404).json({
        success: false,
        message: 'Navigation not found'
      });
    }

    const itemIndex = nav.items.findIndex(item => item._id.toString() === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Nav item not found'
      });
    }

    nav.items[itemIndex] = {
      ...nav.items[itemIndex].toObject(),
      name: name || nav.items[itemIndex].name,
      href: href || nav.items[itemIndex].href,
      order: order !== undefined ? order : nav.items[itemIndex].order,
      isDropdown: isDropdown !== undefined ? isDropdown : nav.items[itemIndex].isDropdown,
      dropdownItems: dropdownItems || nav.items[itemIndex].dropdownItems,
      isActive: isActive !== undefined ? isActive : nav.items[itemIndex].isActive
    };

    await nav.save();

    res.json({
      success: true,
      message: 'Nav item updated successfully',
      data: nav
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating nav item',
      error: error.message
    });
  }
};

// Admin: Delete nav item
export const deleteNavItem = async (req, res) => {
  try {
    const { location, itemId } = req.params;

    const nav = await Navigation.findOne({ location });

    if (!nav) {
      return res.status(404).json({
        success: false,
        message: 'Navigation not found'
      });
    }

    nav.items = nav.items.filter(item => item._id.toString() !== itemId);
    await nav.save();

    res.json({
      success: true,
      message: 'Nav item deleted successfully',
      data: nav
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting nav item',
      error: error.message
    });
  }
};