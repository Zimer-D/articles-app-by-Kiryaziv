const icons: any = {
    calendar:
        "M11.333 1.333c.368 0 .667.298.667.667v.667h.667a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3.333a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2H4V2c0-.368.298-.667.667-.667s.667.298.667.667v.667h5.333V2c0-.368.298-.667.667-.667zm2 6.667H2.666v4.667c0 .368.298.667.667.667h9.333c.368 0 .667-.298.667-.667V8zM4 4h-.667c-.368 0-.667.298-.667.667h0v2h10.667v-2c0-.368-.298-.667-.667-.667h0H12v.667c0 .368-.298.667-.667.667s-.667-.298-.667-.667h0V4H5.333v.667c0 .368-.298.667-.667.667S4 5.035 4 4.666h0V4z",
    trash:
        "M6.666 6.673c.368 0 .667.298.667.667v3.333c0 .368-.298.667-.667.667S6 11.042 6 10.673V7.34c0-.368.298-.667.667-.667zm2.667 0c.368 0 .667.298.667.667v3.333c0 .368-.298.667-.667.667s-.667-.298-.667-.667V7.34c0-.368.298-.667.667-.667zm0-5.333a2 2 0 0 1 2 2h0H14c.368 0 .667.298.667.667s-.298.667-.667.667h0-.667v8a2 2 0 0 1-2 2h0-6.667a2 2 0 0 1-2-2h0v-8H2c-.368 0-.667-.298-.667-.667S1.631 3.34 2 3.34h0 2.667a2 2 0 0 1 2-2h0zM12 4.673H4v8c0 .368.298.667.667.667h6.667c.368 0 .667-.298.667-.667v-8zm-2.667-2H6.666c-.368 0-.667.298-.667.667h4c0-.368-.298-.667-.667-.667z",
    add: "M8.667 3.334c0-.368-.298-.667-.667-.667s-.667.298-.667.667v4h-4c-.368 0-.667.298-.667.667s.298.667.667.667h4v4c0 .368.298.667.667.667s.667-.298.667-.667v-4h4c.368 0 .667-.298.667-.667s-.298-.667-.667-.667h-4v-4z",
    message:
        "M4.666 6c0-.368.298-.667.667-.667h5.333c.368 0 .667.298.667.667s-.298.667-.667.667H5.333c-.368 0-.667-.298-.667-.667zm0 2.667c0-.368.298-.667.667-.667H8c.368 0 .667.298.667.667s-.298.667-.667.667H5.333c-.368 0-.667-.298-.667-.667zm8-6.667a2 2 0 0 1 2 2h0v6.667a2 2 0 0 1-2 2h0-7.333L3.52 14.178c-.868.724-2.187.106-2.187-1.024h0V4a2 2 0 0 1 2-2h0zm0 1.333H3.333c-.368 0-.667.298-.667.667v9.153l1.813-1.511c.24-.2.542-.309.854-.309h7.333c.368 0 .667-.298.667-.667V4c0-.368-.298-.667-.667-.667z",
    messages:
        "M12.593 1.526c.886-.591 2.073.044 2.073 1.109h0v6.175a2 2 0 0 1-2 2h0H12v.667a2 2 0 0 1-1.851 1.995l-.149.005H4.666l-1.167.934c-.839.672-2.067.123-2.161-.914l-.006-.127V7.478a2 2 0 0 1 1.851-1.995l.149-.005H4v-.667a2 2 0 0 1 2-2h0 4.667zM10 6.811H3.333c-.368 0-.667.298-.667.667v5.893l1.167-.934c.236-.189.53-.292.833-.292H10c.368 0 .667-.298.667-.667v-4c0-.368-.298-.667-.667-.667zm-1.333 2c.368 0 .667.298.667.667s-.298.667-.667.667h-4c-.368 0-.667-.298-.667-.667s.298-.667.667-.667h4zm4.667-6.175L11.406 3.92c-.219.146-.476.224-.74.224h0H6c-.368 0-.667.298-.667.667h0v.667H10a2 2 0 0 1 1.995 1.851l.005.149v2h.667c.368 0 .667-.298.667-.667h0V2.636z",

}

const Icon = (props: any) => {
    const size = props.size ? props.size : 16;
    const width = props.width ?? size;
    return (
        <svg
            className={props.className}
            width={width}
            height={size}
            viewBox="0 0 16 16"
            fill={props.fill}
            style={props.style}
        >
            <path d={icons[props.name]}></path>
        </svg>
    );
};

export default Icon;
