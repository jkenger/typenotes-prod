import FlexGap from "./FlexGap";
import { Badge } from "./badge";

interface Props {
  content: string[];
}

function Badges({ content }: Props) {
  return (
    <FlexGap>
      {content.map((role) => (
        <Badge key={role} variant="secondary">
          {role}
        </Badge>
      ))}
    </FlexGap>
  );
}

export default Badges;
