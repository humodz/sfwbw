import { icons } from '@sfwbw/sfwbw-assets';
import { cls } from '../../utils/css';

interface LoadingIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  scale?: number;
}

export function LoadingIcon(props: LoadingIconProps) {
  const { scale = 1, ...imgProps } = props;
  return (
    <img
      src={icons.loading}
      alt="Loading"
      height={24 * scale}
      width={24 * scale}
      {...imgProps}
      className={cls(imgProps.className, {
        pixelated: Number.isInteger(scale),
      })}
    />
  );
}
