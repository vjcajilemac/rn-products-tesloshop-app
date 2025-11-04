import { Layout, Spinner } from "@ui-kitten/components"
import { StyleSheet } from "react-native"

const FullScreenLoader = () => {
  return (
    <Layout
        style= {styles.container}
    >
        <Spinner 
            size="giant"
        />

    </Layout>
  )
}

export default FullScreenLoader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})