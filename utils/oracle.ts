import oracledb from 'oracledb';

export async function getConnection(): Promise<oracledb.Connection> {
  return await oracledb.getConnection({
    user: process.env.ORACLE_DB_USER,
    password: process.env.ORACLE_DB_PASSWORD,
    connectString: process.env.ORACLE_DB_CONNECT_STRING,
  });
}

export async function runQuery<T = any>(query: string, params: any[] = []): Promise<oracledb.Result<T>> {
  const connection = await getConnection();
  try {
    return await connection.execute<T>(query, params, { autoCommit: true });
  } finally {
    await connection.close();
  }
}
