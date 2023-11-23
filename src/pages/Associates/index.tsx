import React, { useEffect } from "react"
import { Box, Divider, Heading, IconButton, Text } from "@chakra-ui/react"
import { styles } from "./styles"
import GenericInput from "../../components/GenericInput"
import GenericButton from "../../components/GenericButton"
import {
  fetchAssociates,
  selectAssociates,
} from "../../app/store/associate/associateSlice"
import { useAppDispatch, useAppSelector } from "../../utils/hooks"
import { IconEye, IconMenu2 } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

export default function Associates(props: any) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [associates, setAssociates] = React.useState<any>([])

  useEffect(() => {
    dispatch(fetchAssociates()).then((res) => {
      setAssociates(res.payload)
    })
  }, [])

  return (
    <Box id="asssociates-page-container" sx={styles.boxContainer}>
      <Box id="associates-page-box" sx={styles.box}>
        <Box id="associates-page-box-header" sx={styles.boxHeader}>
          <Heading id="associates-page-box-header-title">
            Sindicalizados
          </Heading>
          <GenericInput
            id="associates-page-box-header-input"
            placeholder="Pesquisar por Nome ou Mátricula"
            type="text"
            name="search"
            value=""
            onChange={() => {}}
            sxFormControl={{ marginX: "12px", maxWidth: "600px" }}
          />
          <Box>
            <GenericButton
              id="associates-page-box-header-add-button"
              text="Cadastrar"
              onClick={() => {
                navigate("/filiation")
              }}
              sx={{ marginX: "12px" }}
            />
            <GenericButton
              id="associates-page-box-header-import-button"
              text="Importar"
              onClick={() => {}}
              sx={{ marginX: "12px" }}
            />
          </Box>
        </Box>
        <Box id="associates-page-box-body" sx={styles.boxList}>
          {/* Tabela de associados */}
          {associates.map((associate: any) => {
            return (
              <>
                <Box sx={styles.boxItem}>
                  <Box>
                    <Text align={"left"}>{associate.name}</Text>
                    <Text align={"left"}>{associate.id} : : {associate.cpf}</Text>
                  </Box>
                  <Box display={"flex"}>
                    <IconButton
                      aria-label="Ver sindicalizado"
                      icon={<IconEye />}
                      onClick={() => {}}
                      color={"#734A00"}
                    />
                    <Divider orientation="vertical" color={"#734A00"} />
                    <IconButton
                      aria-label="mais opções"
                      icon={<IconMenu2 />}
                      onClick={() => {}}
                      color={"#734A00"}
                    />
                  </Box>
                </Box>
              </>
            )
          })}
        </Box>
        <Box id="associates-page-box-footer">{/* Botões de paginação */}</Box>
      </Box>
    </Box>
  )
}
