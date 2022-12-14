import Weeks from "./Weeks";
import Container from '@mui/material/Container';
import Month from "./Month";

export default function App() {

 
  return (
    <div className="App">
      <Container maxWidth="l" sx={{pt: 3, pb: 3}}>
        <Weeks/>
        <Month/>
      </Container>
    </div>
  );
}

