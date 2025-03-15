export const COMPONENT_TYPES = {
    POST: 'post',
    EVENT: 'event',
    GALLERY: 'gallery',
    FORM: 'form'
  };
  
  export const COMPONENT_TYPE_DETAILS = {
    [COMPONENT_TYPES.POST]: {
      title: 'Post Component',
      description: 'Create rich content posts with text, images, and attachments',
      icon: 'article'
    },
    [COMPONENT_TYPES.EVENT]: {
      title: 'Event Component',
      description: 'Create event listings with dates, venues, and details',
      icon: 'calendar'
    },
    [COMPONENT_TYPES.GALLERY]: {
      title: 'Gallery Component',
      description: 'Create image galleries and collections',
      icon: 'image'
    },
    [COMPONENT_TYPES.FORM]: {
      title: 'Form Component',
      description: 'Create custom forms and surveys',
      icon: 'form'
    }
  };
  