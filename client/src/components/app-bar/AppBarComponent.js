import { AppBar, Toolbar, Typography } from '@material-ui/core'

export const AppBarComponent = () => {
    return (
        <AppBar position="static" style={{ marginBottom: "70px" }}>
            <Toolbar>
                <Typography variant="h5">
                    Expense Manager
                </Typography>
            </Toolbar>
        </AppBar>
    )
}