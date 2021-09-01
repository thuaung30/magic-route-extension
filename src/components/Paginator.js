import { Flex } from "@chakra-ui/react";
import { Pagination } from "semantic-ui-react";

const Paginator = ({ offset, totalPages, setOffset }) => {
  return (
    <Flex mb={2} justifyContent="center">
      <Pagination
        boundaryRange={0}
        defaultActivePage={offset + 1}
        ellipsisItem={null}
        totalPages={totalPages}
        onPageChange={(_, data) => {
          setOffset(parseInt(data.activePage) - 1);
        }}
      />
    </Flex>
  );
};

export default Paginator;
