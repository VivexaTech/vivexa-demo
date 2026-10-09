
import { categories } from './category.js';
import { websites } from './website.js';

const categoryMap = new Map(
    categories.map(category => [category.id, category])
);

const websiteMap = new Map(
    websites.map(website => [website.id, website])
);

const getSortOrder = item => Number(item.sortOrder) || 0;

const isActive = item => item?.status === 'active';

export function getCategoryById(categoryId) {
    if (typeof categoryId !== 'string' || !categoryId.trim()) {
        return null;
    }

    return categoryMap.get(categoryId) || null;
}

export function getWebsitesByCategory(categoryId) {
    if (typeof categoryId !== 'string' || !categoryId.trim()) {
        return [];
    }

    return websites
        .filter(website =>
            isActive(website) &&
            website.category === categoryId
        )
        .sort((a, b) => getSortOrder(a) - getSortOrder(b));
}

export function getFeaturedWebsites() {
    return websites
        .filter(website =>
            isActive(website) &&
            website.featured === true
        )
        .sort((a, b) => getSortOrder(a) - getSortOrder(b));
}

export function getActiveCategories() {
    const activeCategoryIds = new Set(
        websites
            .filter(isActive)
            .map(website => website.category)
    );

    return categories
        .filter(category =>
            activeCategoryIds.has(category.id)
        )
        .sort((a, b) => getSortOrder(a) - getSortOrder(b));
}

export function searchWebsites(query) {
    if (typeof query !== 'string' || !query.trim()) {
        return [];
    }

    const lowerQuery = query.trim().toLowerCase();

    return websites
        .filter(website => {
            if (!isActive(website)) return false;

            const name = String(website.name || '').toLowerCase();
            const description = String(
                website.description || ''
            ).toLowerCase();

            const category = String(
                getCategoryById(website.category)?.name || ''
            ).toLowerCase();

            const tags = Array.isArray(website.tags)
                ? website.tags
                : [];

            const matchTags = tags.some(tag =>
                typeof tag === 'string' &&
                tag.toLowerCase().includes(lowerQuery)
            );

            return (
                name.includes(lowerQuery) ||
                description.includes(lowerQuery) ||
                category.includes(lowerQuery) ||
                matchTags
            );
        })
        .sort((a, b) => getSortOrder(a) - getSortOrder(b));
}

export function getWebsiteById(websiteId) {
    if (typeof websiteId !== 'string' || !websiteId.trim()) {
        return null;
    }

    const website = websiteMap.get(websiteId);

    return isActive(website) ? website : null;
}
 

export { websites };