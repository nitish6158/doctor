{
    !isBankDetailButtonShowing &&
    <TouchableOpacity
        style={HomeStyles.card}
        onPress={() => {
            setIsBankDetailButtonShowing(true)
        }}
    >
        <Image
            source={Images.documents}
            style={HomeStyles.cardImage}
        />
        <Text
            style={HomeStyles.text}
        >{t('YourAccountHasYetToBeVerified')}</Text>
    </TouchableOpacity>
}

{
    isBankDetailButtonShowing &&
    <View
        style={HomeStyles.card}
    >
        <Image
            source={Images.handshake}
            style={HomeStyles.cardImage}
        />
        <Text
            style={HomeStyles.text}
        >{t('PleaseAddYourBankInformationAndContract')}</Text>
        <CustomButton
            title={t('FinishSetup')}
            height={'16%'}
            width={'45%'}
            backgroundColor={Colors.lightblue3}
            textColor={Colors.blue}
            onPress={handleBankDetails}
        />
    </View>
}