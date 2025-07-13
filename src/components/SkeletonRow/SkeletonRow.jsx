import Skeleton from "react-loading-skeleton";

const SkeletonRow = () => {
  return (
    <tr>
      <td className="px-6 py-4">
        <Skeleton width={64} height={64} />
      </td>
      <td className="px-6 py-4">
        <Skeleton width={120} />
      </td>
      <td className="px-6 py-4">
        <Skeleton width={100} />
      </td>
      <td className="px-6 py-4">
        <Skeleton width={50} />
      </td>
      <td className="px-6 py-4">
        <Skeleton width={100} />
      </td>
    </tr>
  );
};

export default SkeletonRow;
