import ContentLoader from "react-content-loader"

const PhotoSkeleton = (props) => (
  <ContentLoader
    speed={1.5}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="2" ry="2" width="100" height="100" />
  </ContentLoader>
)

export default PhotoSkeleton

