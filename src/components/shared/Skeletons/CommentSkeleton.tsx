import ContentLoader from "react-content-loader"

const CommentSkeleton = (props) => (
  <ContentLoader
    speed={1.5}
    height={60}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="20" cy="30" r="20" />
    <rect x="60" y="14" rx="2" ry="2" width="200" height="10" />
    <rect x="60" y="35" rx="2" ry="2" width="200" height="10" />
  </ContentLoader>
)

export default CommentSkeleton

