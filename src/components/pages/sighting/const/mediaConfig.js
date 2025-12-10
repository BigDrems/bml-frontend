/**
 * Media upload configuration
 */

export const ACCEPTED_FILE_TYPES = "image/*,video/*";

export const SUPPORTED_FORMATS = "JPG, PNG, MP4, MOV";

export const FILE_TYPE_VALIDATORS = {
  isImage: (type) => type.startsWith('image/'),
  isVideo: (type) => type.startsWith('video/'),
  isValid: (type) => type.startsWith('image/') || type.startsWith('video/')
};

export const PREVIEW_CONFIG = {
  width: 'w-24',
  height: 'h-24',
  borderRadius: 'rounded-lg',
};
