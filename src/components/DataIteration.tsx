function DataIteration(props: any) {
  const { datas = [], startLength, endLength, children } = props;
  return (
    <>
      {datas.length > 0 &&
        datas
          .slice(startLength, Math.min(endLength, datas.length))
          .map((value: any) => children({ datas: value }))}
    </>
  );
}

export default DataIteration;
