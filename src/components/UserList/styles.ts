import styled from 'styled-components'

export const Container = styled.div`
  margin: 2% 15%;
`
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 500px;

`
export const TableContainer = styled.div`
  overflow-y: scroll;
  overflow-x: scroll;
  max-height: 60vh;
`

export const TableHeader = styled.th`
  background-color: navy;
  color: white;
  height: 40px;
  position: sticky;
  top: 0;
  z-index: 1;
`

export const TableData = styled.td`
  text-align: center;
`

export const FullWidthInput = styled.input`
  width: 98%;
  height: 30px;
  margin-bottom: 20px;
  border: 2px solid black;
  padding-left: 10px;
  display: block;
  margin: auto; 
`

export const TableRow = styled.tr`
  border-bottom: 2px solid #EFEFEF;
  height: 50px;
  :last-of-type {
    border-bottom: 2px solid dimgray;
  }
`

export const SeeMoreBtn = styled.div`
  cursor: pointer;
  border: 1px solid black;
  width: 100px;
  height: 25px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 20px;
`

export const NameInput = styled.input`
  height: 30px;
  border: 2px solid black;
  margin-right: 20px;
  padding-left: 5px;
  @media (max-width: 768px) {
    margin-right: 0px;
    margin-bottom: 10px;
 }
`

export const SelectStyled = styled.select`
  height: 30px;
`

export const NationalityContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`

export const GenderButton = styled.button`
  background-color: white;
  height: 25px;
  width: 70px;
`

export const GenderButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 55px;
  justify-content: space-between;
`

export const GenderNationalityContainer = styled.div`
  display: flex;
  align-items: "center;
  @media (max-width: 768px) {
 }
`

export const FilterOptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  min-height: 75px;
  margin-top: 20px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
     flex-direction: column;
  }
`