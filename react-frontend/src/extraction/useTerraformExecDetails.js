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


import * as React from 'react';
import { TERRAFORM_CHECK, backendGet } from '../backend/backend';
import { Box, Button, Typography } from '@mui/material';

export function useTerraformExecDetails() {
    const [terraformExecDetails, setTerraformExecDetails] = React.useState(null)

    React.useEffect(() => {
        backendGet(TERRAFORM_CHECK, null,
            promise =>
                promise
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        setTerraformExecDetails(data)
                    })
        )

    }, [])

    return React.useMemo(() => {

        let terraformInfo = ""
        let isTerraformError = false
        let terraformErrorComponent = null

        if (terraformExecDetails) {
            // pass
        } else {
            return { isTerraformError, terraformErrorComponent, terraformInfo }
        }


        if (terraformExecDetails && "is_terraform_installed_locally" in terraformExecDetails && terraformExecDetails['is_terraform_installed_locally'] === true) {
            terraformInfo = "* Using locally installed terraform executable"
        } else if (terraformExecDetails && "is_terraform_installed" in terraformExecDetails && terraformExecDetails['is_terraform_installed'] === true) {
            // pass
        } else {
            isTerraformError = true
            terraformErrorComponent = (
                <React.Fragment>
                    <Typography sx={{ mt: 6 }} variant="h5" color="error.main" align='center'>Terraform executable not found</Typography>
                    <Box align='center'>
                        <Button href={"https://developer.hashicorp.com/terraform/downloads"} target="_blank" rel=" noopener noreferrer">
                            Download terraform from Hashicorp
                        </Button>
                    </Box >
                    <Typography sx={{ mt: 6 }} variant="h5" color="error.main" align='center'>Please download the terraform executable and add it to your PATH environment variable.  <br /> (requires restarting the app with updated PATH)</Typography>
                    {"local_terraform_path" in terraformExecDetails ? <Typography sx={{ my: 6 }} variant="h5" color="error.main" align='center'>Alternative: Copy the terraform executable locally to this directory: <br /> {terraformExecDetails["local_terraform_path"]}</Typography>
                        : null}
                </React.Fragment >
            )
        }

        return { isTerraformError, terraformErrorComponent, terraformInfo }
    }, [terraformExecDetails])

}
