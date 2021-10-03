import { Flex } from "@chakra-ui/react";
import { Pagination } from "semantic-ui-react";
import PropTypes from "prop-types";

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

Paginator.propTypes = {
  offset: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setOffset: PropTypes.func.isRequired,
};

export default Paginator;
