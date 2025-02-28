import styled from "styled-components";
import logo from "./assets/Image/Foody Zone.png";
import bgImg from "./assets/Image/bg.png";
import { useEffect, useState } from "react";
import SearchResult from "./components/Searchresult/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [filteredData, setFilteredData] = useState(null);
  const [selectedButton, setSelectedButton] = useState("all");

  const fetchFoodData = async () => {
    setLoading(true);
    try {
      const response = await fetch(BASE_URL);
      const json = await response.json();
      console.log(json);
      setData(json);
      setFilteredData(json);
      setLoading(false);
    } catch (error) {
      setError("unable to fetch data...");
    }
  };
  useEffect(() => {
    fetchFoodData();
  }, []);
  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);
    if (searchValue === "") {
      setFilteredData(null);
    }

    const fillter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredData(fillter);
  };

  const fillterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedButton("all");
      return;
    }
    const fillter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(fillter);
    setSelectedButton(type);
  };

  if (error) return <div>{error}</div>;
  if (loading) return <div>{loading}</div>;
  return (
    <Container>
      <TopContainer>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="search">
          <input
            onChange={searchFood}
            type="text"
            placeholder="Search Food.."
          />
        </div>
      </TopContainer>

      <FIlterContainer>
        <Button onClick={() => fillterFood("all")}>All</Button>
        <Button onClick={() => fillterFood("breakfast")}>Brakfast</Button>
        <Button onClick={() => fillterFood("lunch")}>Lunch</Button>
        <Button onClick={() => fillterFood("dinner")}>Dinner</Button>
      </FIlterContainer>

      <SearchResult data={filteredData} />
    </Container>
  );
};

export default App;

export const Container = styled.div`
  /* max-width: 1280px; */
  margin: 0 auto;
`;

const TopContainer = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
    }
  }
  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
    }
`;

const FIlterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background: #ff4343;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;
