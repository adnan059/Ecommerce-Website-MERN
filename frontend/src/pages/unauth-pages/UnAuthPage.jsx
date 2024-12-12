import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

const UnAuthPage = () => {
  return (
    <div>
      You do not have access to view this page
      <h2>
        <Link to={"/"}>
          <Button>Home</Button>
        </Link>
      </h2>
    </div>
  );
};

export default UnAuthPage;
