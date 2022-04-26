import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function LoadingSkeleton() {
  return (
    <Stack spacing={1}>
        <Skeleton variant="text" height={100} sx={{ bgcolor: 'grey.900' }}/>
        <Skeleton variant="rectangular" height={450} sx={{ bgcolor: 'grey.900' }}/>
        <Skeleton variant="text" sx={{ bgcolor: 'grey.900' }}/>
        <Skeleton variant="text" sx={{ bgcolor: 'grey.900' }}/>
        <Skeleton variant="text" sx={{ bgcolor: 'grey.900' }}/>
      </Stack>
  )
}
