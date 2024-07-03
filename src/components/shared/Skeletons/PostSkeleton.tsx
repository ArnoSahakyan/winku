import ContentLoader from "react-content-loader"

const PostSkeleton = (props) => (
  <ContentLoader
    speed={1.5}
    height={400}
    backgroundColor="white"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="40" cy="27" r="25" />
    <rect x="80" y="14" rx="2" ry="2" width="170" height="10" />
    <rect x="80" y="30" rx="2" ry="2" width="170" height="10" />
    <rect x="0" y="100" rx="2" ry="2" width="100%" height="300" />
    <rect x="0" y="60" rx="2" ry="2" width="100%" height="26" />
  </ContentLoader>
)

export default PostSkeleton
