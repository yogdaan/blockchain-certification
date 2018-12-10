pragma solidity ^0.4.24;

contract Certification {
	struct Certificate {
		string candidate_id;
		uint org_id;
		uint256 expiration_date;
	}

	mapping(bytes32 => Certificate) public certificates;

	event certificateGenerated(bytes32 _certificateId);

	function stringToBytes32(string memory source) private pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
			return 0x0;
    }
    assembly {
			result := mload(add(source, 32))
    }
	}

	function generateCertificate(string memory _id, string memory _candidate_id, uint _org_id, uint256 _expiration_date) public {
		bytes32 byte_id = stringToBytes32(_id);
		certificates[byte_id] = Certificate(_candidate_id, _org_id, _expiration_date);
		emit certificateGenerated(byte_id);
	}

	function getData(string memory _id) public view returns(string memory, uint, uint256) {
		bytes32 byte_id = stringToBytes32(_id);
		Certificate memory temp = certificates[byte_id];
		return (temp.candidate_id, temp.org_id, temp.expiration_date);
	}
}
