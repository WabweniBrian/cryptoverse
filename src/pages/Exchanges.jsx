import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";

import { useGetExchangesQuery } from "../services/cryptoApi";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isLoading } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  return !isLoading ? (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Price</Col>
      </Row>
      <Row>
        {exchangesList?.map((exchange, i) => (
          <Col span={24} key={i}>
            <Collapse>
              <Panel
                key={exchange?.uuid}
                showArrow={false}
                header={
                  <Row key={exchange?.uuid}>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange?.rank}.</strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                      />
                      <Text>
                        <strong>{exchange?.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>${millify(exchange["24hVolume"])}</Col>
                    <Col span={6}>{millify(exchange?.numberOfMarkets)}</Col>
                    <Col span={6}>${millify(exchange?.price)}</Col>
                  </Row>
                }
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                voluptates corrupti molestias quos harum ex repellendus autem
                consequatur officiis cumque. Cumque omnis ea, inventore officiis
                eius deserunt libero sapiente dolorum!
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  ) : (
    <div className="min-h-screen w-full flex-center-center">
      <img
        src="https://cdn.dribbble.com/users/1787505/screenshots/7300251/shot.gif"
        alt="Loading spinner"
        width={100}
        height={100}
      />
    </div>
  );
};

export default Exchanges;
