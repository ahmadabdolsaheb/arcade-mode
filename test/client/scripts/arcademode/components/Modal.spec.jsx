/* Unit tests for file client/scripts/arcademode/components/Modal.jsx. */
import React from 'react';
import { shallow } from 'enzyme';
import Immutable from 'immutable';

import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { Modal, Form, FormControl, Button } from 'react-bootstrap';

import ArcadeModal from '../../../../../client/scripts/arcademode/components/Modal';
import appConfig from '../../../../../client/jsons/appconfig.json';

chai.use(chaiEnzyme());

const formControlLength = 2;

const props = {
  modal: true,
  onModalClose: () => {},
  mode: 'Rosetta',
  onChangeMode: () => {},
  difficulty: 'Medium',
  onChangeDifficulty: () => {},
  editor: 'Normal',
  onChangeEditor: () => {},
  appConfig: Immutable.Map(Immutable.fromJS(appConfig))
};

describe('Component: <ArcadeModal>', () => {
  it('should render', () => {
    const wrapper = shallow(<ArcadeModal {...props} />);
    expect(wrapper).to.have.length(1);
  });

  it('should render all sub components', () => {
    const wrapper = shallow(<ArcadeModal {...props} />);

    expect(wrapper.find(Modal)).to.have.length(1);

    expect(wrapper.find(Modal.Header)).to.have.length(1);

    // can't use .text() on components; .to.have.string can work
    expect(wrapper.find(Modal.Title)).to.have.length(1);
    const title = document.createElement('span');
    title.innerHTML = wrapper.find(Modal.Title).html();
    expect(title.textContent).to.equal('Arcade Mode');

    const body = wrapper.find(Modal.Body);
    expect(body).to.have.length(1);

    const footer = wrapper.find(Modal.Footer);
    expect(footer).to.have.length(1);
    expect(footer.find(Form)).to.have.length(1);
    expect(footer.find(FormControl)).to.have.length(formControlLength);
    expect(footer.find(Button)).to.have.length(1);

    const opts = Object.keys(appConfig.options);
    let index = 0;
    opts.forEach(optName => {
      if (appConfig.options[optName].showDropdownMenu) {
        const defaultValue = appConfig.options[optName].default;
        const selectElem = document.createElement('select');
        selectElem.innerHTML = wrapper.find(FormControl).at(index++).html();
        expect(selectElem.value).to.equal(defaultValue);
      }
    });

    const button = document.createElement('button');
    button.innerHTML = wrapper.find(Button).html();
    expect(button.textContent).to.equal('Submit');
  });
});

