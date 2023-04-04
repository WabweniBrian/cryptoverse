/* eslint-disable jsx-a11y/anchor-has-content */
import { Avatar, Card, Col, Row, Select, Typography } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import moment from "moment/moment";
import { useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";

const News = ({ simplified }) => {
  const count = simplified ? 6 : 15;
  const [newsCategory, setNewsCategory] = useState("cryptocurrency");

  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews, isLoading } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });

  const { Text, Title } = Typography;
  const { Option } = Select;

  const demoImage =
    "https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

  return !isLoading ? (
    <>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency, i) => (
              <Option value={currency?.name} key={i}>
                {currency?.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      <Row gutter={[24, 24]} style={{ marginTop: "30px" }}>
        {cryptoNews?.value?.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title level={4} className="news-title">
                    {news?.name.length > 35
                      ? `${news?.name.slice(0, 35)}...`
                      : news?.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt={news?.name}
                    style={{ maxWidth: "200px", maxHeight: "100px" }}
                  />
                </div>
                <p>
                  {news?.description.length > 100
                    ? `${news?.description.slice(0, 100)}...`
                    : news?.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt="news"
                    />
                    <Text className="provider-name">
                      {news?.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news?.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
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

export default News;
