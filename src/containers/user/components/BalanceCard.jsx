import { Flex, GridItem, Text, Grid, Container } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import MyButton from "../../../components/MyButton";

const BalanceCard = ({ balance, asset_code }) => {
  const history = useHistory();
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
            <MyButton
              handleClick={() =>
                history.push({
                  pathname: "/send",
                  state: { assetType: asset_code },
                })
              }
            >
              Send
            </MyButton>
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
