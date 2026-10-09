export const websites = [
    {
        id: "petshop-basic",
        name: "Pet Shop Basic",
        category: "pet-shop", // Fixed hyphenation
        description: "A clean, essential website for a local pet supply store.",
        image: "assets/images/petshop-basic.png",
        url: "/petshop/basic/",
        plan: "Basic",
        featured: true,
        tags: ["pets", "store", "supplies", "basic", "local"],
        sortOrder: 1,
        status: "active"
    },
    {
        id: "petshop-advance",
        name: "Pet Shop Advance",
        category: "pet-shop", // Fixed hyphenation
        description: "A comprehensive pet store template with grooming appointments.",
        image: "assets/images/petshop-advance.jpg",
        url: "/petshop/advance/",
        plan: "Premium", // Aligned with frontend badge logic
        featured: true,
        tags: ["pets", "grooming", "appointments", "advanced", "booking"],
        sortOrder: 2,
        status: "active"
    },
    {
        id: "realestate-pro",
        name: "Real Estate Pro",
        category: "real-estate", // Fixed hyphenation
        description: "A premium real estate listing demo with property search.",
        image: "assets/images/realestate-pro.jpg",
        url: "/realestate/",
        plan: "Premium", // Aligned with frontend badge logic
        featured: true,
        tags: ["real estate", "property", "listings", "agency", "realtor"],
        sortOrder: 1,
        status: "active"
    }
];