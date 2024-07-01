import ContentLoader from "react-content-loader"

const FriendSkeleton = (props) => (
  <ContentLoader
    className="FriendSkeleton"
    speed={1.5}
    height={60}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="35" cy="30" r="28" />
    <rect x="80" y="14" rx="2" ry="2" width="140" height="10" />
    <rect x="80" y="35" rx="2" ry="2" width="140" height="10" />
  </ContentLoader>
)

export default FriendSkeleton

