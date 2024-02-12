import React from 'react';
import { useTable } from 'react-table';
import styles from "./SubCategoryTable.module.css"

const SubCategoryTable = ({ subCategory }) => {
  // Definir las columnas y datos de la tabla
  console.log(subCategory)
  const columns = React.useMemo(
    () => [
      
      {
        Header: 'Nombre',
        accessor: 'name',
      },
      {
        Header: 'Descripción',
        accessor: 'description',
      },
      {
        Header: 'Acciones',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div className={styles.btnActionsCategory}>
            <button onClick={() => handleEdit(row.original)} className={styles.editCategoryBtn}>Editar</button>
            <button onClick={() => handleDelete(row.original.id)} className={styles.deleteCategoryBtn}>Eliminar</button>
          </div>
        ),
      },
      // Puedes agregar más columnas según tus necesidades
    ],
    []
  );

  const data = React.useMemo(() => subCategory, [subCategory]);

  // Configuración de la tabla usando react-table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className={styles.miSubTablaClaseCSS}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={subCategory._id}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={subCategory._id}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={subCategory._id}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} key={subCategory._id}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SubCategoryTable;
