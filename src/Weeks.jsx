import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function Weeks() {
    const [fec, setFec] = useState("")

    const [weeks, setWeeks] = useState([])
    const [weekString, setWeeksString] = useState("")
  
    //Función para guardar la fecha del DateTimePicker (input)
    const handleChangeFec = (e) => {
      setFec(e.target.value)
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
    
    //Función para obtener el array con las semanas
    /*
    [
        {
            week: Semana 1,
            start: 2022-01-01,
            end: 2022-01-07
        }
    ]
    
    */
    const getWeeks = (fecIniString)=> {
    //Instanciamos la fecha 
    let fec = new Date(fecIniString)
    //Le aumentamos un día porque nos Date nos devuelve la fecha pero en un día anterior al ingresado
    fec.setDate(fec.getDate() + 1)

    const result = []

    let flag = true
    let count = 0
    while (flag) {
        count++

        //Declaramos el obj
        let obj = {
            week : 'Semana ' + count,
            start: format(fec),
            end: "",
        }

        //Si la fecha supera el dia 25/12 los días finales se pondrán como el último día del año, sino simplemente se aumentarán de 6 en 6
        fec.getDate() > 25 && fec.getMonth() + 1 === 12 ? fec.setDate(31) : fec.setDate(fec.getDate() + 6)

        obj.end = format(fec)

        result.push(obj)

        //Si la fecha final es 31/12, se termina el bucle
        if(fec.getDate() === 31 && fec.getMonth() + 1 === 12) flag = false

        //Aumentamos un día
        fec.setDate(fec.getDate() + 1)
    }
    //Devolvemos el resultado en un array
    return result
    }
    
    //Función para mostrar las semanas en la caja de texto
    const handleClickWeek = () => {
      setWeeks(getWeeks(fec))
  
      let fecstring = ""
      getWeeks(fec).forEach((f) => {
        fecstring += f.week + ": " + f.start + " a " + f.end + "\n"
        return
      })
      setWeeksString(fecstring)
    }
  
    console.log(weeks)
    

    return (
        <Box sx={{ height: '50vh', display: 'flex', flexDirection:'column', justifyContent: 'center' }}>
          <Box sx={{display: 'flex', alignItems:'center'}}>
            <TextField
              id="date"
              label="Día de inicio"
              type="date"
              sx={{ width: 220}}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChangeFec}
            />
            <Button variant="contained" sx={{ml: 2}} onClick={handleClickWeek}>Aceptar</Button>
          </Box>
          <TextField
            id="outlined-multiline-flexible"
            label="Resultado: "
            multiline
            maxRows={4}
            value={weekString}
            sx={{mt: 4}}
          />
        </Box>
    );
}