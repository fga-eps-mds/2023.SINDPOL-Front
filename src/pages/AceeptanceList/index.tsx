import React, { useEffect, useState } from 'react';
import {
    Box,
    Heading,
} from '@chakra-ui/react';
import { styles } from './styles';
import GenericInput from '../../components/GenericInput';
import GenericButton from '../../components/GenericButton';
import { fetchAssociates, selectAssociates } from '../../app/store/associate/associateSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useNavigate } from 'react-router-dom';
import AceeptanceList from '../../components/AceeptanceList';
import MenuOrdenacao from '../../components/GenericMenuOptions';



export default function Associates(props: any) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [associates, setAssociates] = React.useState<any>([])
    const [dataList, setDataList] = useState([]);
    const [dataList1, setDataList1] = useState<{ id: string; name: string }[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);


    const Opcoes = ['Novo', 'Antigo', 'Matrícula'];

    const handleCheckboxChange = (id: string) => {
        const updatedIds = selectedIds.includes(id)
            ? selectedIds.filter(selectedId => selectedId !== id)
            : [...selectedIds, id];
        setSelectedIds(updatedIds);
        console.log(updatedIds)

        return { selectedIds, handleCheckboxChange };
    };


    const handleSelecao = (opcao: string) => {
        console.log(`Opção selecionada na página: ${opcao}`);
    };

    const handleDisableUsers = async () => {
        try {
            for (const userId of selectedIds) {
                const response = await fetch(`http://localhost:8001/api/users/${userId}/disable`, {
                    method: 'PATCH',
                });

                if (response.ok) {
                    console.log(`User with ID ${userId} disabled successfully`);
                } else {
                    console.error(`Failed to disable user with ID ${userId}:`, response.statusText);
                }
            }
        } catch (error) {
            console.error('Error disabling users:', error);
        }
    };

    const handleEnableUsers = async () => {
        try {
            for (const userId of selectedIds) {
                const response = await fetch(`http://localhost:8001/api/users/${userId}/enable`, {
                    method: 'PATCH',
                });

                if (response.ok) {
                    console.log(`User with ID ${userId} enable successfully`);
                } else {
                    console.error(`Failed to enable user with ID ${userId}:`, response.statusText);
                }
            }
        } catch (error) {
            console.error('Error disabling users:', error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8001/api/users/');
                const data = await response.json();
                setDataList(data);
                setDataList1(data);
            } catch (error) {
                console.error('Erro ao buscar dados do arquivo JSON:', error);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
      dispatch(fetchAssociates()).then((res) => {
        setAssociates(res.payload)
      })
    }, [])

    console.log(associates)


    return (
        <Box
            id="asssociates-page-container"
            sx={styles.boxContainer}
        >
            <Box
                id="associates-page-box"
                sx={styles.box}
            >
                <Box
                    id="associates-page-box-header"
                    sx={styles.boxHeader}
                >
                    <Box
                        sx={styles.boxHeaderTop}
                    >
                        <Heading
                            id="associates-page-box-header-title"
                            sx={styles.boxHeaderTitle}
                        >
                            Aprovar cadastro de sindicalizados
                        </Heading>
                        <GenericInput
                            id="associates-page-box-header-input"
                            placeholder="Pesquisar por Nome ou Matrícula"
                            type="text"
                            name="search"
                            value=""
                            sxInput={{ border: 'none', borderRadius: '50px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}
                            onChange={() => { }}
                        />
                        <MenuOrdenacao opcoes={Opcoes} onSelecao={handleSelecao} />
                    </Box>
                    <Box
                        sx={styles.boxHeaderBotton}
                    >
                        <GenericButton
                            id="associates-page-box-header-import-button"
                            text="Aprovar cadastro"
                            onClick={handleEnableUsers} // Chama a função para desativar os usuários selecionados
                            sx={{ marginX: '12px', borderRadius: '50px' }}
                        />
                        <GenericButton
                            id="associates-page-box-header-import-button"
                            text="Desaprovar cadastro"
                            onClick={handleDisableUsers} // Chama a função para desativar os usuários selecionados
                            sx={{ marginX: '12px', borderRadius: '50px' }}
                        />
                    </Box>
                </Box>
                <Box
                    id="associates-page-box-body"
                    sx={styles.boxList}
                >
                    {/* Tabela de associados */}
                    <AceeptanceList data={dataList} selectedIds={selectedIds} onCheckboxChange={handleCheckboxChange} />

                </Box>
                <Box
                    id="associates-page-box-footer"
                >
                    {/* Botões de paginação */}
                </Box>
            </Box>
        </Box>
    );
}
