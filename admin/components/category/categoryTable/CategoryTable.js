import React from 'react';
import { useTable } from 'react-table';
import styles from "./CategoryTable.module.css"

const CategoriesTable = ({ categories }) => {
  // Definir las columnas y datos de la tabla
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

  const data = React.useMemo(() => categories, [categories]);

  // Configuración de la tabla usando react-table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className={styles.miTablaClaseCSS}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={categories._id}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={categories._id}>
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
            <tr {...row.getRowProps()} key={categories._id}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} key={categories._id}>
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

export default CategoriesTable;
