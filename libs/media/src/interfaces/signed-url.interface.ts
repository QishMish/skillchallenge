interface PresignedUrl {
  url: string;
}

interface PresignedUrlPost {
  url: string;
  fields: Record<string, string>;
}

export { PresignedUrlPost, PresignedUrl };
