import React from 'react';
import "./_main-display.scss";

export default class MainDisplay extends React.Component {
    routerHistory: any;

    constructor(props) {
        super(props);
        this.state = {};
        this.handleSearchChangeValue = this.handleSearchChangeValue.bind(this);
    }

    handleSearchChangeValue(event): void {

    }

    render() {
        return (
            <main className="main-display-container">
                <p>

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lorem ex, interdum in malesuada vel, eleifend ac velit. Morbi pretium, dolor eu porta vehicula, nisi purus tempus libero, id accumsan mi eros et enim. Suspendisse potenti. Curabitur vitae vulputate eros, sit amet ullamcorper erat. Fusce eleifend iaculis magna non venenatis. Nulla facilisi. Aliquam ultrices rutrum turpis at rhoncus. Curabitur iaculis mi dui, sed ornare odio lobortis eget. Ut non elit diam. Quisque lacinia massa lacus, quis consequat nisi feugiat vitae. Nullam porttitor ipsum sed nisi sagittis finibus. Donec id augue nec ante congue aliquet tincidunt sit amet lectus. Duis a ipsum vitae sem molestie dignissim sit amet vel orci. Integer luctus velit efficitur faucibus commodo. Proin odio lorem, luctus in tincidunt sed, sagittis sit amet est.

                    Sed accumsan tortor laoreet gravida posuere. Aenean convallis nisi a tincidunt blandit. Phasellus nunc massa, tincidunt vitae urna nec, rutrum faucibus est. Pellentesque pulvinar sollicitudin odio eget rhoncus. Suspendisse a odio tincidunt, fermentum eros eu, molestie risus. Integer convallis, sapien varius ornare efficitur, magna elit lobortis sem, eu ullamcorper urna lacus id eros. Integer a urna ante. In aliquet nunc orci, a fermentum arcu ornare hendrerit.

                    Sed gravida, est in accumsan vulputate, nunc neque tincidunt eros, id auctor velit dolor at dolor. Suspendisse eleifend ultrices est, eu ornare lectus tincidunt vitae. Aliquam tempus vestibulum justo nec posuere. Curabitur dolor mauris, semper non sollicitudin ac, convallis et tellus. Nam vehicula nibh eget consectetur blandit. In vitae urna eu justo pulvinar dapibus a sit amet erat. Aliquam viverra varius semper. Suspendisse consequat ante odio, in laoreet elit interdum in. Pellentesque quis arcu in risus porta lacinia non vitae neque.

                    Morbi at dui imperdiet, finibus nisi sit amet, mollis leo. Etiam hendrerit gravida pellentesque. Curabitur dapibus lectus ante, non imperdiet nibh tempor a. Aenean tempor at ipsum non interdum. Duis vel turpis ante. Nullam eros mi, interdum ac dignissim ut, faucibus eu ante. Nullam facilisis nisi eget dapibus fringilla. Sed et nulla et risus elementum rhoncus. Nullam tristique porttitor tempus. Morbi eleifend volutpat dolor non lacinia. Donec ut justo vel nisl euismod ultrices eget in lacus. Quisque ultricies purus lorem, in pulvinar lacus tempus eget. Mauris mi felis, maximus sit amet orci at, cursus venenatis lacus. Nam efficitur ornare commodo. Pellentesque auctor cursus erat, nec tincidunt tellus vehicula eu.

                    Ut molestie molestie libero, ac lacinia turpis feugiat vel. Duis non ligula ac dolor consequat fringilla. Ut id nulla felis. Mauris ullamcorper cursus risus eu commodo. Nulla facilisi. Duis maximus, eros sit amet accumsan aliquet, dolor mauris venenatis risus, in porta erat ipsum ut diam. Nunc consectetur justo nec lacus condimentum iaculis. Pellentesque nec orci et lectus malesuada rutrum ac sed tortor. Etiam pretium molestie lacus non bibendum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                </p>
            </main>
        );
    }
}
