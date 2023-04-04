import { Col, Row, Statistic, Typography } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import millify from "millify";
import { Link } from "react-router-dom";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";

const HomePage = () => {
  const { Title } = Typography;

  const { data, isLoading } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  return !isLoading ? (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Crypto Currencies"
            value={globalStats?.total}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges "
            value={millify(Number(globalStats?.totalExchanges))}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap "
            value={millify(Number(globalStats?.totalMarketCap))}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24 Volume "
            value={millify(Number(globalStats?.total24hVolume))}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets "
            value={millify(Number(globalStats?.totalMarkets))}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 crypto currencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
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

export default HomePage;
