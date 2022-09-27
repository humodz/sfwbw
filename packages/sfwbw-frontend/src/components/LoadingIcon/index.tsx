import { icons } from '@sfwbw/sfwbw-assets';

export function LoadingIcon(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src={icons.loading}
      alt="Loading"
      height="20px"
      width="20px"
      {...props}
    />
  );
}
