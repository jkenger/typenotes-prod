import { TableCell, TableRow } from "./Table";
import { Skeleton } from "./Skeleton";

function SkeletonLoader() {
  return [...Array(3)].map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton className="w-[80px] h-[20px] " />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[200px] h-[20px] " />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[25px] h-[20px] " />
      </TableCell>
    </TableRow>
  ));
}

export default SkeletonLoader;
