const apiConstant = {
  GET_UPLOADS_URLS: 'brands/media/upload-url?',
  REGISTER_MEDIA: 'brands/media/register',
  GET_MEDIA: '/media',
  GET_PROJECTS: '/brands/projects',
  GET_PROJECT_BY_ID: 'brands/projects/:id',
  GET_PROPOSALS: '/brands/projects/:id/proposals',
  GET_CREATIVES: '/brands/projects/:id/creatives',
  GET_COMMENTS: 'brands/creatives/:id/comments?',
  POST_COMMENTS: '/brands/creatives/:id/comments',
  CREATIVE_UPDATE_STATUS:
    'brands/projects/:projectId/creatives/:creativeId/status',
  CREATIVE_BULK_UPDATE: '/brands/projects/:projectId/creatives/bulk-update',
};

export default apiConstant;
