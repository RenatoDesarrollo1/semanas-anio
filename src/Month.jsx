import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Month() {

    const [year, setYear] = useState()
    const [monthsYear, setMonthsYear] = useState([])
    const [monthsYearStr, setMonthsYearStr] = useState("")

    //Función para guardar año del TextBox (input)
    const handleYear = (e) => {
        setYear(e.target.value)
    }

    //Función para formatear la fecha
    const format = (fec) => {
        if(fec instanceof Date) {
          const year = fec.getFullYear()
          const month = fec.getMonth() + 1
          const day = fec.getDate()
          return year + "-" + 
                (month>9 ? '' : '0') + month + "-" +
                (day>9 ? '' : '0') + day
        }
        else {
          return "No es una fecha"
        }
    }
    
    //Función para obtener la fecha de inicio y final de cada mes, por el año ingresado
    const getMonths = (yearStr) => {
        const result = []
        
        for(let i = 0; i < 12; i++) {
            let obj = {
                month: 'Mes ' + (i + 1),
                /*
                new Date(año,
                    mes anterior al correspondiente (enero: 0),
                    día (0 para obtener el día anterior al primer día del mes ingresado, Date(2002, 1 (feb), 0) = 2002-01 (ene)-31)
                    )
                 */
                
                start: format(new Date(year, i, 1)),
                end: format(new Date(year, i + 1, 0))
            }

            result.push(obj)
        }
        //Devolver resultado
        return result
    }

    //Función para mostrar los meses en la caja de texto
    const handleClickMonth = () => {
        setMonthsYear(getMonths(year))

        let monthstring = ""
        getMonths(year).forEach((m) => {
            monthstring += m.month + ": " + m.start + " a " + m.end + "\n"
        })

        setMonthsYearStr(monthstring)

    }

    console.log(monthsYear)
    return (
        <Box sx={{ height: '50vh', display: 'flex', flexDirection:'column', justifyContent: 'center' }}>
            <Box sx={{display: 'flex', alignItems:'center'}}>
                <TextField  label="Año" variant="outlined" sx={{ width: 220}} onChange={handleYear}/>
                <Button variant="contained" sx={{ml: 2}} onClick={handleClickMonth}>Aceptar</Button>
            </Box>
            <TextField
                id="outlined-multiline-flexible"
                label="Resultado: "
                multiline
                maxRows={4}
                value={monthsYearStr}
                sx={{mt: 4}}
            />
        </Box>
    )
}
