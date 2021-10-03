import {
  Flex,
  GridItem,
  Text,
  Grid,
  Button,
  Container,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const BalanceCard = ({ balance, asset_code }) => {
  return (
    <Flex p={5} w="100%" shadow="sm" borderWidth="1px" alignItems="center">
      <Grid templaterows="repeat(2, 1fr)" gap={4} width="100%">
        <GridItem>
          <Container width={300}>
            <Text fontSize="3xl" textAlign="center" noOfLines={[1, 2]}>
              {balance}
            </Text>
          </Container>
          <Text textAlign="center">{asset_code}</Text>
        </GridItem>
        <GridItem>
          <GridItem textAlign="center">
            <Button
              size="lg"

              //   onClick={() =>
              //     router.push({
              //       pathname: "/send",
              //       query: { assetType: asset_code },
              //     })
              //   }
            >
              Send
            </Button>
          </GridItem>
        </GridItem>
      </Grid>
    </Flex>
  );
};

BalanceCard.propTypes = {
  balance: PropTypes.string.isRequired,
  asset_code: PropTypes.string.isRequired,
};

export default BalanceCard;
