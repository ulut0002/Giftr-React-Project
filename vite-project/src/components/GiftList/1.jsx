/* 

<GridItem colStart={1} colEnd={2} rowStart={1} rowEnd={2}>
<Text className="gift-name">{gift.name}</Text>
</GridItem>
<GridItem colStart={1} colEnd={2} rowStart={2} rowEnd={3}>
<Text className="gift-url">{gift.url}</Text>
</GridItem>
<GridItem colStart={1} colEnd={2} rowStart={2} rowEnd={3}>
<Text className="gift-store">{gift.store}</Text>
</GridItem> */

{
  /* <GridItem colStart={2} colEnd={3} rowStart={1} rowEnd={3}>
  
  <Link to={`/people/${uid}/gifts/${gift._id}/edit`}>
    <Button colorScheme="blue">
      <EditIcon />
    </Button>
  </Link>
  </GridItem>
  
  <GridItem colStart={3} colEnd={4} rowStart={1} rowEnd={3}>
  {/* Gift Edit icon }
  <Link to={`/people/${uid}/gifts`}>
    <Button onClick={deleteGift} colorScheme="blue">
      <AiOutlineDelete />
    </Button>
  </Link>
  </GridItem> */
}
<Grid
  templateRows="repeat(2, minmax(min-content,max-content))"
  templateColumns="1fr repeat(2,  minmax(min-content,max-content))"
  gap={1}
>
  {message}
</Grid>;
