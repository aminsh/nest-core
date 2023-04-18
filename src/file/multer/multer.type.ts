export interface MulterOptions {
  destination: string;
  onUploading?: <TRequest>(request: TRequest, mimeType: string) => Promise<void>;
}
