import React, { Component, PropTypes } from 'react';
import { Table, TableCell, TableAction, TableBody, TableTextCell, TableHeader, TableColumn, TableRow } from './Dashboard';

class ImportFiles extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.files !== this.props.files;
  }

  getAction(files, file, index) {
    if (file.status === 'pending') {
      return <div />;
    }

    return (
      <TableAction id={`remove-file-${index}`}
        type="success" title="Remove" icon="263"
        onClick={this.props.onRemoveFile} args={[ files, index ]}
      />
    );
  }

  render() {
    const files = this.props.files.toJS();
    const status = { queued: '', pending: 'Pending', failed: 'Failed (see email)', validation_failed: 'Failed', completed: 'Completed' };
    const colors = { queued: '', pending: 'orange', failed: 'red', validation_failed: 'red', completed: 'green' };

    if (!files.length) {
      return <div />;
    }

    return (
      <Table>
        <TableHeader>
          <TableColumn width="50%">File Name</TableColumn>
          <TableColumn width="20%">Size</TableColumn>
          <TableColumn width="25%">Import Status</TableColumn>
          <TableColumn width="5%" />
        </TableHeader>
        <TableBody>
        {files.map((file, index) =>
          <TableRow key={index}>
            <TableTextCell>{file.name}</TableTextCell>
            <TableTextCell>{((file.size || 0) / 1024).toFixed(2) + ' KB'}</TableTextCell>
            <TableTextCell>
              <span style={{ color: colors[file.status] }}>
                {status[file.status]}
              </span>
            </TableTextCell>
            <TableCell>
              {this.getAction(files, file, index)}
            </TableCell>
          </TableRow>
        )}
        </TableBody>
      </Table>
    );
  }
}

ImportFiles.propTypes = {
  files: PropTypes.object.isRequired,
  onRemoveFile: PropTypes.func.isRequired
};

export default ImportFiles;
