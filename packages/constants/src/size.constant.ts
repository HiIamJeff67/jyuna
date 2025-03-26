export const FileInterceptorByte = 1;
export const FileInterceptorKiloBytes = 1024;
export const FileInterceptorMegaBytes = 1048576;
export const FileInterceptorGigaBytes = 1073741824;

export const MaxAvatarFileSizePerMegaBytes = 5;
export const MaxAvatarFileSize =
  MaxAvatarFileSizePerMegaBytes * FileInterceptorMegaBytes;
