import { icons } from '@sfwbw/sfwbw-assets';
import { cls } from '../../utils';

interface LoadingIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  scale?: number;
}

export function LoadingIcon(props: LoadingIconProps) {
  const { scale = 1, ...imgProps } = props;
  return (
    <img
      src={icons.loading}
      alt="Loading"
      height={20 * scale}
      width={20 * scale}
      {...imgProps}
      className={cls(imgProps.className, {
        pixelated: Number.isInteger(scale),
      })}
    />
  );
}
