/*
Copyright 2023 Dynatrace LLC

Licensed under the Apache License, Version 2.0 (the "License"); 
you may not use this file except in compliance with the License. 
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software 
distributed under the License is distributed on an "AS IS" BASIS, 
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
See the License for the specific language governing permissions and 
limitations under the License.
*/

import { Grid, Typography } from '@mui/material';
import * as React from 'react';
import TabPanelAssisted from '../navigation/TabPanelAssisted';

export function WizardPage(props) {
  const [tabIdx, setTabIdx] = React.useState(0);

  return (
    <React.Fragment>
      <Grid item sx={{ mt: 2, mb: 1 }} direction={"column"} align={'center'}>
        <Typography variant='h4'>
          Assisted Config Migration
        </Typography>
      </Grid>
      <TabPanelAssisted tabIdx={tabIdx} setTabIdx={setTabIdx} />
    </React.Fragment>
  );
}