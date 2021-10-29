import React from 'react';
import styled from 'styled-components';
import DropDown from './DropDown';

const Search = styled.input`
  font-family: 'Space Mono', monospace;
  outline: none;
  font-size: 25px;
  border: 0px;
  border-bottom: 5px solid black;
  background: #F0F8FF;
  width: 200px;
  padding-left: 10px;
  @media screen and (max-width: 786px) {
    width: 54vw;
    font-size: 21px;
  }
`;

const SearchWrapper = styled.div`
  background: white !important;
  display: flex;
  background: #F0F8FF;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const SearchButton = styled.div`
  width: 160px;
  border-bottom: 5px solid black;
  background: #F0F8FF;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  @media screen and (max-width: 768px) {
    width: 0px;
  }
`;

const FloatB = styled.div`
  height: 70%;
  background: white;
  border-radius: 5px;
  margin-right: 10px;
  padding: 0px 10px;
  border: 1px solid #e0c3fc;
  box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    /*background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);*/
    background: #f6eff7;
  }

  @media screen and (max-width: 768px) {
    margin-right: 0px;
  }
`;

class SearchGroup extends React.Component {

  render() {

    const { collection, id, search } = this.props;
    return (
      <div>
        <SearchWrapper>
        <DropDown onCollectionChange={(pfp) => collection(pfp)}/>
        <Search onChange={(event) => id(event.target.value)} defaultValue="9999"/>
        <SearchButton>
          <FloatB onClick={() => search()}>search&nbsp;<i className="gg-search"></i></FloatB>
        </SearchButton>
        </SearchWrapper>
      </div>
    )
  }
}

export default SearchGroup;
