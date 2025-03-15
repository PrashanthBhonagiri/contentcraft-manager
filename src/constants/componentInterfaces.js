export const COMPONENT_FIELDS = {
    POST: [
      { name: 'title', type: 'text', required: true, label: 'Post Title' },
      { name: 'content', type: 'editor', required: true, label: 'Content' },
      { name: 'featuredImage', type: 'image', required: false, label: 'Featured Image' },
      { name: 'attachments', type: 'files', required: false, label: 'Attachments' }
    ],
    EVENT: [
      { name: 'title', type: 'text', required: true, label: 'Event Title' },
      { name: 'startDate', type: 'datetime', required: true, label: 'Start Date' },
      { name: 'endDate', type: 'datetime', required: false, label: 'End Date' },
      { name: 'description', type: 'editor', required: true, label: 'Description' },
      { name: 'location', type: 'text', required: true, label: 'Location' },
      { name: 'eventImage', type: 'image', required: false, label: 'Event Image' }
    ],
    GALLERY: [
      { name: 'title', type: 'text', required: true, label: 'Gallery Title' },
      { name: 'description', type: 'textarea', required: false, label: 'Description' },
      { name: 'images', type: 'multipleImages', required: true, label: 'Gallery Images' }
    ],
    FORM: [
      { name: 'title', type: 'text', required: true, label: 'Form Title' },
      { name: 'description', type: 'textarea', required: false, label: 'Description' },
      { name: 'formFields', type: 'formBuilder', required: true, label: 'Form Fields' }
    ]
  };
  