import ImageGallery from "react-image-gallery";

export default function Slider({ product }) {
  const images = [
    {
      original: product?.thumbnail,
      thumbnail: product?.thumbnail,
      originalHeight: 500,
    },
    ...(product?.first_image
      ? [
          {
            original: product.first_image,
            thumbnail: product.first_image,
            originalHeight: 500,
          },
        ]
      : []),
    ...(product?.second_image
      ? [
          {
            original: product.second_image,
            thumbnail: product.second_image,
            originalHeight: 500,
          },
        ]
      : []),
    ...(product?.third_image
      ? [
          {
            original: product.third_image,
            thumbnail: product.third_image,
            originalHeight: 500,
          },
        ]
      : []),
  ];

  const loaded = images.length > 0;

  return (
    <ImageGallery
      showPlayButton={loaded}
      showFullscreenButton={loaded}
      items={images}
    />
  );
}
